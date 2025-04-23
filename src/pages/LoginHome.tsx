import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => (
  <header style={{ backgroundColor: "#FFF6D5" }} className="h-[115px] w-full" />
);

const IntroSection: React.FC = () => (
  <section className="flex flex-col gap-5 mt-14 px-6">
    <h1 className="text-2xl font-bold leading-10 max-w-[22rem]">
      <span className="font-bold">Navi </span>
      <span className="text-2xl font-bold text-black">
        의 간편한 이력서 작성으로 맞춤형 일자리를 찾아보세요!
      </span>
    </h1>
    <p className="text-lg leading-8 text-neutral-800 max-w-[22rem] text-left">
      음성 입력과 AI가 알아서 작성해주는<br /> 
      최적의 간편 이력서!
    </p>
  </section>
);

const ImageSection: React.FC = () => (
  <section className="flex justify-center mt-14">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a97f80d41a183f09d4a4494e747314b83d7e4e7?placeholderIfAbsent=true"
      className="h-[168px] w-[205px]"
      alt="image 3"
    />
  </section>
);

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
  <section className="flex flex-col items-center mt-16">
    <p className="text-xl text-center text-neutral-800 max-w-[22rem]">
      누구나 할 수 있어요.
      <br />
      지금 <span className="font-bold">Navi</span>를 시작해보세요!
    </p>
    <button
      className="mt-[7rem] p-3 text-lg font-bold text-black bg-amber-200 rounded-md max-w-[22rem] w-full"
      onClick={() => {navigate("/index")}}
    >
      시작하기
    </button>
  </section>
  )
};

const LoginHome: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&family=Bruno+Ace+SC&display=swap"
      />
      <main className="pb-20">

        <Header />
        <IntroSection />
        <ImageSection />
        <CallToAction />
      </main>
    </>
  );
};

export default LoginHome;
