import {useState, useCallback, useEffect, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    
    const getSomeImages = useCallback(() => {
        console.log('fetching');
        return ([
            'https://images.wallpaperscraft.ru/image/single/kniga_shar_magiya_koldovstvo_46753_1920x1080.jpg',
            'https://images.wallpaperscraft.ru/image/single/gorod_futurizm_scifi_131831_1920x1080.jpg'
        ])
    }, [slide])

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }
    
    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect(() => {
        console.log('СТИлЬ');
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
                

            <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImage] = useState([]);

    useEffect(() => {
        setImage(getSomeImages());
    }, [getSomeImages])
    
    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}


function App() {
    const [slider, setSlider] = useState(true);


  return (
      <>
        {slider ? <Slider/> : null}
      </>
        
  );
}

export default App;
