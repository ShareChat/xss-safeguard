import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-hidden bg-gradient-to-l from-red-400 via-gray-900 to-black">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            bounce: {
              vertical: {
                value: 0,
              },
              horizontal: {
                value: 0,
              },
            },
            color: {
              value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E'],
              animation: {
                enable: true,
                speed: 30,
              },
            },
            move: {
              decay: 0.1,
              direction: 'top',
              enable: true,
              gravity: {
                acceleration: 9.81,
                enable: true,
                maxSpeed: 200,
              },
              outModes: {
                top: 'none',
                default: 'destroy',
                bottom: 'bounce',
              },
              speed: {
                min: 50,
                max: 150,
              },
            },
            number: {
              value: 0,
              limit: 300,
            },
            opacity: {
              value: 1,
              animation: {
                enable: false,
                startValue: 'max',
                destroy: 'min',
                speed: 0.3,
                sync: true,
              },
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: 'random',
              move: true,
              animation: {
                enable: true,
                speed: 60,
              },
            },
            tilt: {
              direction: 'random',
              enable: true,
              move: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 60,
              },
            },
            shape: {
              type: ['circle', 'square', 'polygon'],
              options: {
                polygon: [
                  {
                    sides: 5,
                  },
                  {
                    sides: 6,
                  },
                ],
              },
            },
            size: {
              value: 3,
            },
            roll: {
              darken: {
                enable: true,
                value: 30,
              },
              enlighten: {
                enable: true,
                value: 30,
              },
              enable: true,
              speed: {
                min: 15,
                max: 25,
              },
            },
            wobble: {
              distance: 30,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15,
              },
            },
          },
          emitters: {
            position: {
              x: 50,
              y: 100,
            },
            size: {
              width: 0,
              height: 0,
            },
            rate: {
              quantity: 10,
              delay: 0.1,
            },
          },
        }}
        height="400"
        width="400"
      />
      <div className="bg-white rounded-lg p-6 md:mx-auto my-4 mx-4 z-10">
        <h1 className="text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-black to-pink-600">
          I am invicible
        </h1>
        <video src="hack.mp4" width={420} muted autoPlay loop />
      </div>
    </div>
  );
}

export default Home;
