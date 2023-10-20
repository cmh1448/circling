package ac.mju.turkey.circle.common.pagination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.function.Function;


@Getter
@AllArgsConstructor
public class PagingQueryResult <T> {
    List<T> result;

    Long totalCount;

    Pageable pageable;

    public <J> PageImpl<J> toPageImpl(Function<T, J> mapper) {
        return new PageImpl<>(result.stream().map(mapper).toList(), pageable, totalCount);
    }
}
