import ImagesSlider from "./components/imageSlider";

function App() {
  const images = [
    "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  ];
  return (
    <>
      <ImagesSlider images={images} />
    </>
  );
}

export default App;
