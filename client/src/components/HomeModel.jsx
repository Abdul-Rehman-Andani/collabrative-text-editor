import React from 'react'
import Model from './Model'
import AddDocument from './AddDocument'
import useHomeModelStore from '../hooks/useHomeModelStore'

const HomeModel = () => {

    const {closeHomeModel} = useHomeModelStore();
  return (
    <>
    <Model close={closeHomeModel}>
        <AddDocument />
    </Model>
    </>
  )
}

export default HomeModel