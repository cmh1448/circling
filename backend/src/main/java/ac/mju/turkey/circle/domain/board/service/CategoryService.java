package ac.mju.turkey.circle.domain.board.service;

import ac.mju.turkey.circle.domain.board.dto.CategoryDto;
import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.board.repository.CategoryQueryRepository;
import ac.mju.turkey.circle.domain.board.repository.CategoryRepository;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.repository.CircleRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.function.LongFunction;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CircleRepository circleRepository;
    private final CategoryQueryRepository categoryQueryRepository;
    @Transactional
    public CategoryDto.Response create(Long circleId, CategoryDto.Request request) {
        Circle circle = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.CIRCLE_NOT_FOUND));

        Category toSave = request.toEntity();

        toSave.setCircle(circle);

        Category saved = categoryRepository.save(toSave);

        return CategoryDto.Response.from(saved);
    }

    @Transactional
    public CategoryDto.Response update(Long categoryId, CategoryDto.Request request) {
        Category toUpdate = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_CATEGORY_NOT_FOUND));

        if(Objects.nonNull(request.getTitle()))
            toUpdate.setTitle(request.getTitle());

        if(Objects.nonNull(request.getPriority()))
            toUpdate.setPriority(request.getPriority());

        return CategoryDto.Response.from(toUpdate);
    }

    @Transactional(readOnly = true)
    public List<CategoryDto.Response> findAllByCircle(Long circleId) {
        Circle circle = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.CIRCLE_NOT_FOUND));

        List<Category> found = categoryQueryRepository.findAllByCircle(circle);

        return found.stream()
                .map(CategoryDto.Response::from)
                .toList();
    }
}
