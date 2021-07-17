import { useEffect } from 'react';
import { Howl } from 'howler';
import WaveBackground from 'components/WaveBackground';
import BgSound from 'assets/music/bg-sea-1.mp3';

const Level1 = () => {
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

export default Level1;
