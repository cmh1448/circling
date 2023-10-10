---
마크다운 파일 편집기로 Visual Studio Code 사용을 권장합니다.
---

# End-Point Documentation

이 폴더는 Circling 프로젝트의 엔드포인트 폼을 관리하기 위한 폴더입니다.  
다음과 같은 규칙을 지켜 End Point 관리를 해주시기 바랍니다.

### 규칙

1. 각 도메인별로 마크다운 파일이 생성되며, 각 마크다운 파일에는 일정한 형식으로 API의 Spec을 작성합니다.
2. 아직 구현되지 않은 API에는 제목 뒤에 (미구현) 문구를 붙입니다.
3. API 구현 완료시 (미구현)문구를 제거합니다.

### API Spec 포맷 예시

다음은 API 포맷 예시입니다.

---

### 1-1) 로그인 API

설명: JWT 로그인 인증 토큰을 발급하는 API  
경로: /api/auth/sign-in  
권한: 누구나

```js
//request 는 다음과 같이 작성합니다.
//request에는 각 필드별로 설명을 작성해야 합니다.

//요청에 들어갈 수 있는 모든 필드가 들어있어야 하며,
//조건적으로 들어가는 필드는 설명을 기입해야 합니다.
const request = {
  email: "cmh1448@naver.com", //로그인 이메일
  password: "1234", //로그인 패스워드
};

//response는 설명을 생략해도 괜찮습니다.
const response = {
  user: {
    email: "cmh1448@naver.com",
    firstName: "명현",
    lastName: "천",
    nickName: "천명현",
  },
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbWgxNDQ4QG5hdmVyLmNvbSIsImlhdCI6MTY5NjkyMTE5NiwiZXhwIjoxNjk3MDA3NTk2fQ.rpiYwrVzSE55UaCs4v4bUhQHhd4qdLM-sueLYyZmvXA",
  expireAt: "2023-10-11 15:59",
};
```

---

### 1-2) 회원가입 API

설명: 신규 회원가입을 위한 API  
경로: /api/auth/sign-up  
권한: 누구나

```js
const request = {
  email: "cmh1448@naver.com", //이메일
  password: "1234", //비밀번호
  firstName: "명현", //이름
  lastName: "천", //성
  nickName: "천명현", //닉네임
};

const response = {
  email: "cmh1448@naver.com",
  firstName: "명현",
  lastName: "천",
  nickName: "천명현",
};
```
