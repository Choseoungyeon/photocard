# Photocard

![cvxcb](https://user-images.githubusercontent.com/97166696/162905129-7f6301b0-54ee-4a3c-a707-d783d9717156.PNG)

포토카드 꾸미기 사이트입니다.

mongodb와 nodejs, 그리고 react를 사용하여 만들었고 heroku를 통해 배포하였습니다.

react-moveable와 react-selecto를 사용해 사용자가 직접 스티커를 화면상에서 조절하여 카드를 꾸밀수 있게 만들었습니다.
그리고 로그인 기능을 구현해 그 꾸민 카드를 사용자가 자신만의 앨범에 저장하여, 커뮤니티에 공유할 수 있는 기능을 만들었습니다.
관리자가 사용할 수 있는 스티커를 편리하게 추가할 수 있도록 cloudinary 저장소를 사용해 불러오고 저장할 수 있도록 만들었습니다.
로고와 메인화면에 사용한 몇몇 이미지들을 제외하면, 이 사이트의 이미지들은 전부 cloudinary 저장소를 사용해 저장하고 불러오도록 되어있습니다.

<br />
<br />

# Utilites

### 1. 로그인 회원가입 기능

사용자는 회원가입을 통해 유저정보를 생성할 수 있고 로그인을 통해 앨범페이지와 커뮤니티에 들어갈 수 있습니다. 저장했던 포토카드를 불러올수 있고 그것을 커뮤니티에 올릴 수 있습니다.
redux를 이용해 auth시스템을 만들었습니다.

<br />

>Using Skills : mongodb, mongoose, nodejs, redux

<br />
<br />

### 2. 앨범기능

![dfsdfdgv](https://user-images.githubusercontent.com/97166696/162912119-0a83efc7-ad14-4234-8bfd-ca9bf72ecfa5.PNG)

만들고 저장했던 포토카드를 불러올수 있습니다. 만들었던 날짜를 통해서 만들었던 포토카드를 검색할 수 있습니다. 앨범에서 사용자는 만들었던 포토카드를 삭제하거나, 다운로드할 수 있습니다.

<br />

>Using Skills : js-file-download

<br />
<br />

### 3. 포토카드 만들기 기능

![sas](https://user-images.githubusercontent.com/97166696/162912506-bf15a127-91d6-4be3-9c98-e655fb57eabc.PNG)

왼쪽의 포토카드를 꾸밀수 있는 공간과 오른쪽의 포토카드를 꾸밀 수 있는 스티커를 선택할 수 있는 공간으로 나누어져 있습니다.

react-dropzone을 사용하여 +모양을 클릭하면 포토카드 모양의 틀에 원하는 사진을 삽입할 수 있습니다. 삽입되어진 사진의 크기가 위치가 맘에 들지 않는 경우, 다시 한번 클릭하여 사진의
사이즈를 조정하거나 위치를 조정할 수 있습니다.

그 후에 오른쪽의 상자에서 원하는 스티커를 클릭하면 클릭한 모양의 스티커가 똑같이 쪽의 포토카드의 오른쪽 상단에 나타납니다. 
왼쪽에 나타난 스티커를 클릭하면 스티커를 원하는대로 수정할 수 있는 moveable박스가 생성됩니다. react-selecto를 이용해 클릭한 스티커만 oveable박스가 나타나도록 코딩했습니다. 
사용자는 moveable박스를 이용해 해당 스티커의 사이즈를 수정하거나 원하는 위치에 이동시키거나 rotate시킬 수 있습니다. shift키나 전체 드래그를 해 전체 스티커를 선택하여 
한꺼번에 이동시킬 수 있습니다.

포토카드 꾸미기가 완료되었다면, 오른쪽 상자아래의 완성버튼을 눌러주세요. 해당 포토카드를 편집한 날짜와 함께, 꾸민 포토카드는 my album에 저장됩니다. html2canvas를 이용하여
다 꾸민 카드의 이미지를 png로 cloudinary에 저장하고, 그 저장한 이미지의 주소를 다시 mongodb의 데이터베이스에 저장하는 방식으로 기능을 구현했습니다.

<br />

>Using Skills : react-moveable, react-selecto, react-dropzone, html2canvas, cloudinary

<br />
<br />

### 4. 커뮤니티 기능

![dsdf](https://user-images.githubusercontent.com/97166696/162916132-76df0767-7891-4a4e-8c84-0629838f3314.PNG)

>**1. 게시판**

직접 꾸민 포토카드를 커뮤니티에 올릴수 있습니다. 올린 게시물은 전체 사용자에게 보여지며 로그인한 사용자만이 세부내용을 볼 수 있습니다. 커뮤니티 게시물은 날짜, 게시물을 쓴
사용자의 이름, 게시물의 제목을 검색하여 특정 게시물을 찾아낼 수 있습니다. pagination 기능을 구현하여 한 화면에 7개씩 표현되도록 구현하였습니다

<br />
<br />

>**2. 상세페이지**

![dfsdggdf](https://user-images.githubusercontent.com/97166696/162916338-e54a3cc6-7367-4538-b00e-a2406e25cd19.PNG)

커뮤니티의 게시물을 클릭하면 그 게시물의 세부내용을 볼 수 있는 페이지로 이동합니다. 누군가가 올린 포토카드를 react-slick으로 볼 수 있고, 게시물에 올려진 포토카드를 다운로드 할 수 있습니다.
게시물을 쓴 당사자라면 오른쪽 하단의 DELETE와 MODIFY 버튼을 눌러 게시글을 수정하거나 삭제할 수 있습니다.

<br />
<br />

**댓글기능**

각각의 상세페이지에는 댓글과 대댓글을 달수 있는 코멘트 기능을 구현했습니다. 쓴 댓글을 바로 반영할 수 있도록 redux를 사용했습니다.

<br />
<br />

>**3. 업로드, 수정페이지**

![dg](https://user-images.githubusercontent.com/97166696/162916627-b11413a9-38ef-4693-9319-1b15904d9ad8.PNG)

slick 슬라이더의 첫번째 부분에 있는 +모양 포토카드를 클릭하면 현재 사용자가 꾸미고 저장한 포토카드들을 선택할 수 있는 창이 열립니다. 그리고 각각의 포토카드들을 선택하면 업로드, 수정페이지의
slick 슬라이더에 선택된 포토카드들이 반영됩니다. 오른쪽의 form에서 각각 제목과 내용을 입력해주세요. 입력한 제목과 내용은 그대로 상세페이지에 반영되어 저장됩니다. 모든 내용을 입력했다면
오른쪽 하단의 SUBMIT 버튼을 눌러 수정, 업로드내용을 반영해주세요

<br />

>Using Skills : react-slick, redux

<br />
<br />

# Skills

백엔드
+ nodejs
+ mongodb
+ cloudinary

프론트엔드
+ react
+ redux
+ react-dom
+ react-moveable
+ react-selecto
+ react-slick
+ html2canvas
+ react-dropzone
+ react-icons

<br />
<br />

Contribution : 100%

processivity : 80%

2022.04.12 = 메인페이지 수정

추가예정 : 좋아요(Like)기능 

