import React, { useState, useEffect, useRef } from 'react';

const InPainting = ({projectImage}) => {
  const [originalImage, setOriginalImage] = useState('');
  const [imageRendered, setImageRendered] = useState(false)
  const canvasRef = useRef(null);
  console.log(canvasRef)


  const fileSelected = (imageUrl) => {
    // const file = event.target.files[0];
    // img.src = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl
    img.onload = () => {
      if (img.width !== img.height) {
        const minVal = Math.min(img.width, img.height);
        setup(img, 0, 0, minVal, minVal);
      } else {
        setup(img, 0, 0, img.width, img.height);
      }
    };
  };

  const setup = (img, x, y, width, height) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, x, y, width, height, 0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineWidth = 25;
    ctx.globalCompositeOperation = 'destination-out';

    let isDrawing = false;

    const startDrawing = (event) => {
      isDrawing = true;
      const pos = getPos(event);
      console.log('start erasing', pos);
      points.setStart(pos.x, pos.y);
    };

    const stopDrawing = () => {
      console.log('stop erasing');
      isDrawing = false;
    };

    const draw = (event) => {
      if (!isDrawing) return;
      const pos = getPos(event);
      points.newPoint(pos.x, pos.y);
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const points = (() => {
      let queue = [],
        qi = 0;

      const clear = () => {
        queue = [];
        qi = 0;
      };

      const setStart = (x, y) => {
        clear();
        newPoint(x, y);
      };

      const newPoint = (x, y) => {
        queue.push([x, y]);
      };

      const tick = () => {
        let k =30; // adjust to limit points drawn per cycle
        if (queue.length - qi > 1) {
          ctx.beginPath();
          if (qi === 0) ctx.moveTo(queue[0][0], queue[0][1]);
          else ctx.moveTo(queue[qi - 1][0], queue[qi - 1][1]);

          for (++qi; --k >= 0 && qi < queue.length; ++qi) {
            ctx.lineTo(queue[qi][0], queue[qi][1]);
          }
          ctx.stroke();
        }
      };

      setInterval(tick, 50); // adjust cycle time

      return {
        setStart,
        newPoint,
      };
    })();

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);

    // setOriginalImage(img);
  };

  const downloadOriginal = () => {
    console.log('download original');
    const link = document.createElement('a');
    link.download = 'original.png';
    link.href = originalImage;
    link.click();
  };

  const downloadMask = () => {
    console.log('download mask');
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'mask.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // useEffect(() => {
  //   if (projectImage) {
  //     setImageRendered(true);
  //   }
  // }, [projectImage]);
  
  fileSelected(projectImage)

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mark what would like to change</h2>
      <div>
        <div style={styles.title}>
          Use the mouse to erase parts of the photo that should be edited by AI
        </div>
        <div></div>
        <canvas ref={canvasRef} width={600} height={600} style={styles.outerCanvas}></canvas>
      </div>
      <div>
        <div style={styles.title}>3. Download Images</div>
        <div style={styles.buttonContainer}>
          <button style={{ margin: '10px' }} onClick={downloadOriginal}>
            Download Original
          </button>
        </div>
        <div style={styles.buttonContainer}>
          <button style={{ margin: '10px' }} onClick={downloadMask}>
            Download Mask
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // background: "white"
  },
  separator: {
    marginVertical: '8px',
    borderBottom: '1px solid #737373',
  },
  title: {
    textAlign: 'center',
    marginVertical: '8px',
  },
  outerCanvas: {
    position: 'relative',
    width: '45vw',
    height: '45vw',
    border: '1px solid black',
    background: "white"
  },
  buttonContainer: {
    marginVertical: '8px',
  },
};

export default InPainting;
