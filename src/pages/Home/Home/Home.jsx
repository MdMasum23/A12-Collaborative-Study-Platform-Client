import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientFeedback from '../ClientFeedback/ClientFeedback';
import PlatformFeatures from '../PlatformFeatures/PlatformFeatures';
import AvailableSessions from '../AvailableSessions/AvailableSessions';

const Home = () => {
    return (
        <div>
            <section className='Banner section'>
                <Banner></Banner>
            </section>
            <section className='Available session section'>
                <AvailableSessions></AvailableSessions>
            </section>
            <section className='Service section'>
                <OurServices></OurServices>
            </section>
            {/* <div className="divider divider-primary"></div> */}
            <section className='Features section'>
                <PlatformFeatures></PlatformFeatures>
            </section>
            {/* <div className="divider divider-primary"></div> */}
            <section className='Feedback section'>
                <ClientFeedback> </ClientFeedback>
            </section>
        </div>
    );
};

export default Home;