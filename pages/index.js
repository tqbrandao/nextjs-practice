import React from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some adress, 5, 12345 City",
//     description: "This is a first meetup",
//   },

//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some adress, 10, 12345 City",
//     description: "This is a second meetup",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Search for meetups" />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data de uma API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tqbrandao:agriderino123@cluster0.mvwb8rg.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
