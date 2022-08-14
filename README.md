# 사용자 정의 컨텍스트 제공자 구성요소 빌드 및 사용

## IDE 자동완성

컨텍스트를 제공 (Provider) 하는 쪽의 value 프로퍼티에 컨텍스트의 데이터 뿐만 아니라, 컨텍스트 값 지정을 통해서 함수도 내려줘서 컴포넌트들이 사용할 수 있었다.

하지만 실제 해당 함수를 사용하려는 컴포넌트에서 코드를 입력해보면 VScode 의 자동 완성이 동작하지 않았다.
그 이유는 컨텍스트를 생성하는 파일에서 초기 더미 함수 () => {} 를 지정하지 않았기 때문이다.

```jsx
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // * 기본 컨텍스트에 추가해 주어야 vscode 상에 뜬다.
});

export default AuthContext;
```

![egimage](https://user-images.githubusercontent.com/104371223/184519930-9f2b1f0a-65c9-46d0-b47d-c0adeab8ed0c.png)

이제 VSCode 에서 자동완성에 onLogout 이 뜬다.

## App.js 에 있는 로그인 로직을 컨텍스트 관리 컴포넌트에서 처리하기.

브랜치 url : [GitHub - teddyjung8808/learn-context-api](https://github.com/teddyjung8808/learn-context-api)

코드 리팩토링의 목적 : - 로그인 관련 로직들을 전부 컨텍스트 파일 하나에서 관리하고 처리할 수 있게 하기 위함 - 컨텍스트 파일에서 로직을 처리하기 위해 Provider 로 감싼 jsx 를 리턴하는 컴포넌트를 생성하고, 리액트 훅을 사용하게 만들 수 있게 하기 위함 - App.js 는 상위 파일의 개념이므로 기타 로직이 들어가는 것이 코드상 보기 좋지 않음 - 대신 index.js 에서 App 컴포넌트를 컨텍스트로 감싸주면 된다. 그러면 AuthContext 의 하위 children 으로 App 이 오게 되고 App 은 컨텍스트의 값을 받을 준비가 되었다.

위 브랜치에서 전체 코드 확인이 가능
