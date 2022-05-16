import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../src/components/Common/Breadcrumb";
import Layout from "../src/components/VerticalLayout";
import Notiflix from "notiflix";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "../src/components/Card";
import { useAuth } from "../src/hook/auth";
import SignIn from "../src/components/SignIn";


const Home: NextPage = () => {
    const {isSignedIn} = useAuth()
    
  return (
    <>
      {!isSignedIn() && <SignIn />}
    </>
  );
};

export default Home;
