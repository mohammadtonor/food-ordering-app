import { Hero } from '../components/layout/Hero';
import {HomeMenu} from '../components/layout/HomeMenu';
import SectionHeader from '../components/layout/section-header';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about" className='mt-8 text-center'>

        <SectionHeader mainHeader={'about us'} subHeader={'our story'} />

        <div className='mt-4 text-center flex flex-col gap-4 text-gray-500 mx-auto max-w-4xl'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Magni minima odit recusandae. Illum ipsa non repudiandae?
            Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat
            inventore laboriosam officiis quam rem!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Magni minima odit recusandae. Illum ipsa non repudiandae?
            Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat
            inventore laboriosam 
          </p>
          <p>
            ipsam iste quos suscipit tempora? Aperiam esse fugiat
            inventore laboriosam officiis quam rem! officiis quam rem!
          </p>
        </div>
      </section>
      <section id='contact' className='text-center my-8'>
        <SectionHeader
          subHeader={'don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className='mt-8'>
          <a className='text-4xl underline text-gray-500' href='tel:+989173623364'>
            +98 917 362 3364
          </a>
        </div>
      </section>
    </>
  )
}
