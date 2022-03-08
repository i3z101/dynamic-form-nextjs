import { DynamicFormInterface } from 'helpers/interfaces'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import dynamicFormActions from 'store/actions/dynamic-form-actions';
import { wrapper } from 'store/store-config'
import DynamicForm from '../components/index/dynamic-form'

const Home: NextPage = (props: any) => {
  return <Fragment>
      <Head>
        <title>Dynamic form</title>
        <meta name='description' content='This is a dynamic form page using Nextjs' />
        <meta name='description' content='This page was created by Aziz' />
      </Head>
      <DynamicForm/>
    </Fragment>
}


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((
  ({dispatch, getState}) => async ()=> {
    
    const data = await fetch(`${process.env.BACKEND_URL}/form`);
    const response = await data.json();
    dispatch(dynamicFormActions.addAllDynaicFormData(response.data));
    return {
      props: {}
    }
  }
))

export default Home
