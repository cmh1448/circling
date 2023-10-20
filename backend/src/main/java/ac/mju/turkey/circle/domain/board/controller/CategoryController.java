package ac.mju.turkey.circle.domain.board.controller;

import ac.mju.turkey.circle.domain.board.dto.CategoryDto;
import ac.mju.turkey.circle.domain.board.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/circles/{circleId}/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public CategoryDto.Response create(@PathVariable Long circleId, @RequestBody CategoryDto.Request request) {
        return categoryService.create(circleId, request);
    }

    @GetMapping
    public List<CategoryDto.Response> findAll(@PathVariable Long circleId) {
        return categoryService.findAllByCircle(circleId);
    }

    @PatchMapping("/{categoryId}")
    public CategoryDto.Response update(@PathVariable Long categoryId, @RequestBody CategoryDto.Request request, @PathVariable String circleId) {
        return categoryService.update(categoryId, request);
    }

}
