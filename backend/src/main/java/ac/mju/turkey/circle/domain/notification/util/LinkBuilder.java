package ac.mju.turkey.circle.domain.notification.util;

import ac.mju.turkey.circle.domain.board.entity.Comment;
import ac.mju.turkey.circle.domain.board.entity.Post;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class LinkBuilder {
    public static String from(Comment comment) {
        return String.format("/circles/board/posts/%s", comment.getPost().getId());
    }

    public static String from(Post post) {
        return String.format("/circles/board/posts/%s", post.getId());
    }

    public static String fromChat(String targetEmail) {
        return String.format("/chat/%s", URLEncoder.encode(targetEmail, StandardCharsets.UTF_8));
    }
}
