import Head from 'next/head'
import FirstContainer from '../components/home/01_container/first_container';
import SecondContainer from '../components/home/02_container/second_container';
import ThirdContainer from '../components/home/03_container/third_container';

export default function Home() {
  return (
    <>
      <FirstContainer></FirstContainer>
      
      <SecondContainer></SecondContainer>

      <ThirdContainer></ThirdContainer>  
    </>
  )
}
