package ac.mju.turkey.circle.domain.board.service;

import ac.mju.turkey.circle.domain.board.dto.PostDto;
import ac.mju.turkey.circle.domain.board.dto.SortBy;
import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.board.repository.CategoryRepository;
import ac.mju.turkey.circle.domain.board.repository.PostQueryRepository;
import ac.mju.turkey.circle.domain.board.repository.PostRepository;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.repository.CircleRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class PostService {
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final PostQueryRepository postQueryRepository;
    private final CircleRepository circleRepository;
    @Transactional
    public PostDto.Response create(Long categoryId, PostDto.Request request) {
        Category toBeStored = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_CATEGORY_NOT_FOUND));

        Post toSave = request.toEntity();

        //setup relations
        toSave.setCategory(toBeStored);
        toSave.setCircle(toBeStored.getCircle());

        Post saved = postRepository.save(toSave);

        return PostDto.Response.from(saved);
    }

    @Transactional
    public PostDto.Response update(Long id, PostDto.Request request) {
        Post toUpdate = postRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        if(Objects.nonNull(request.getTitle()))
            toUpdate.setTitle(request.getTitle());

        if(Objects.nonNull(request.getContent()))
            toUpdate.setContent(request.getContent());

        return PostDto.Response.from(toUpdate);
    }

    @Transactional
    public void delete(Long id) {
        Post toDelete = postRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        postRepository.delete(toDelete);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.PaginationResponse> paginateByCategory(Long categoryId, Pageable pageable) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_CATEGORY_NOT_FOUND));

        return postQueryRepository.paginateByCategory(category, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.PaginationResponse> paginateByCircle(Long circleId, Pageable pageable) {
        Circle circle = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.CIRCLE_NOT_FOUND));

        return postQueryRepository.paginateByCircle(circle, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PostDto.Response> paginateFeeds(CircleUserDetails user, Pageable pageable) {
        return postQueryRepository.paginateFeedsByUser(user, pageable);
    }

    @Transactional(readOnly = true)
    public PostDto.Response findById(Long postId) {
        Post found = postRepository.findById(postId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        return PostDto.Response.from(found);
    }

    @Transactional(readOnly = true)
    public List<PostDto.Response> findMyPosts(CircleUserDetails user, SortBy sortBy, Boolean reversed) {
        List<Post> founds = postQueryRepository.findAllByCreatorEmail(user.getEmail());

        Comparator<Post> comparator = null;
        switch (sortBy) {
            case title -> comparator = Comparator.comparing(Post::getTitle);
            case comments -> comparator = Comparator.comparing(p -> p.getComments().size());
            case createdAt -> comparator = Comparator.comparing(Post::getCreatedAt);
        }

        if(reversed) comparator = comparator.reversed();

        return founds.stream().sorted(comparator).map(PostDto.Response::from).toList();

    }
}
