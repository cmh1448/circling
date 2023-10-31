package ac.mju.turkey.circle.domain.board.controller;


import ac.mju.turkey.circle.domain.board.dto.PostDto;
import ac.mju.turkey.circle.domain.board.dto.SortBy;
import ac.mju.turkey.circle.domain.board.service.PostService;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {
    private final PostService postService;

    @PostMapping("/categories/{categoryId}/posts")
    public PostDto.Response create(@PathVariable Long categoryId, @RequestBody PostDto.Request request) {
        return postService.create(categoryId, request);
    }

    @PatchMapping("/posts/{postId}")
    public PostDto.Response update(@PathVariable Long postId, @RequestBody PostDto.Request request) {
        return postService.update(postId, request);
    }

    @DeleteMapping("/posts/{postId}")
    public void delete(@PathVariable Long postId) {
        postService.delete(postId);
    }

    @GetMapping("/posts/{postId}")
    public PostDto.Response findById(@PathVariable Long postId) {
        return postService.findById(postId);
    }

    @GetMapping("/categories/{categoryId}/posts")
    public Page<PostDto.PaginationResponse> paginateByCategory(@PathVariable Long categoryId, @PageableDefault Pageable pageable) {
        return postService.paginateByCategory(categoryId, pageable);
    }

    @GetMapping("/circles/{circleId}/posts")
    public Page<PostDto.PaginationResponse> paginateByCircle(@PathVariable Long circleId, @PageableDefault Pageable pageable) {
        return postService.paginateByCircle(circleId, pageable);
    }

    @GetMapping("/posts/feeds")
    public Page<PostDto.Response> paginateFeedsByUser(@AuthenticationPrincipal CircleUserDetails user, @PageableDefault Pageable pageable) {
        return postService.paginateFeeds(user, pageable);
    }

    @GetMapping("/posts/my")
    public List<PostDto.Response> findMyPosts(@AuthenticationPrincipal CircleUserDetails user,
                                              @RequestParam(defaultValue = "createdAt") SortBy sort,
                                              @RequestParam(defaultValue = "false") Boolean reverse) {
        return postService.findMyPosts(user, sort, reverse);
    }
}
