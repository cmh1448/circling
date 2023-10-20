package ac.mju.turkey.circle.domain.board.controller;


import ac.mju.turkey.circle.domain.board.dto.PostDto;
import ac.mju.turkey.circle.domain.board.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/circles/{circleId}")
public class PostController {
    private final PostService postService;

    @PostMapping("/categories/{categoryId}")
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

    @GetMapping("/categories/{categoryId}/posts")
    public Page<PostDto.PaginationResponse> paginateByCategory(@PathVariable Long categoryId, @PageableDefault Pageable pageable) {
        return postService.paginateByCategory(categoryId, pageable);
    }

    @GetMapping("/posts")
    public Page<PostDto.PaginationResponse> paginateByCircle(@PathVariable Long circleId, @PageableDefault Pageable pageable) {
        return postService.paginateByCircle(circleId, pageable);
    }
}
