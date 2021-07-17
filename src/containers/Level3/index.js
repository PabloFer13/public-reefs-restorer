import { useEffect } from 'react';
import { Howl } from 'howler';
import WaveBackground from 'components/WaveBackground';
import BgSound from 'assets/music/bg-sea-3.mp3';

const Level3 = () => {
  const bgMusic = new Howl({
    src: BgSound,
    autoplay: false,
    loop: true,
  });

  useEffect(() => {
    bgMusic.play();
    return () => {
      bgMusic.stop();
    };
  }, []);
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <WaveBackground />
      </div>
    </div>
  );
};

export default Level3;
