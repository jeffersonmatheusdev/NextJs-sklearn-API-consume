const axios = require('axios');

import MyHead from '../Components/MyHead';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import MyFooter from '../Components/MyFooter';
import styles from '../styles/Home.module.css';
import onDropFunction from '../Functions/onDrop';
import DragAndDrop from '../Components/DragAndDrog';

export default function Home() {
  const [image, setImage] = useState(false);
  const [resultPredict, setResultPredict] = useState(false);
  const onDrop = onDropFunction(setImage);
  const { getRootProps } = useDropzone({ onDrop })

  useEffect(async () => {
    if (image !== false) {

      let req = await axios.post('http://192.168.100.130:5000/predict', {
        image: image
      });

      setResultPredict(req.data.prediction);
    }
  }, [image])

  return (
    <div className={styles.container}>
      <MyHead />

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to flower categorizer
        </h1>

        <div className={styles.mainContainer}>

          <div {...getRootProps()} className={styles.imageContainer}>
            {
              image
                ?
                <img src={`data:image/jpeg;base64,${image}`} className={styles.contentImage} />
                :
                <DragAndDrop
                  styles={styles}
                />
            }
          </div>

          <div className={styles.result}>
            {
              image
                ?
                resultPredict
                  ?
                  <>
                    <h2 className={styles.resultTitle}>Result: <a className={styles.resultTag}>{resultPredict}</a></h2>
                    <button
                      className={styles.buttonReset}
                      onClick={() => {
                        setImage(false)
                        setResultPredict(false)
                        }
                      }
                    >
                      RETURN
                    </button>
                  </>
                  :
                  'Predicting...'
                :
                'Waiting drop image to predict.'
            }
          </div>

        </div>
        <MyFooter />
      </main>
    </div >
  )
}