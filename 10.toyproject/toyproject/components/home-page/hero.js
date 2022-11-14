// 자동으로 이미지가 최적화된다.
import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        {/* public 폴더는 루트 레벨에 있으므로 따로 작성하지 않아야한다. */}
        <Image
          src="/images/site/coding-event.jpg"
          alt="An image showing Huni"
          width={300}
          height={300}
        />
      </div>
      <h1>안녕하세요, 김승훈 입니다.</h1>
      <p>
        저는 프론트엔드 및 블록체인 개발자로 주로 React 를 사용하고 있습니다.
      </p>
    </section>
  );
}

export default Hero;
