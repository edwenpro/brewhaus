import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Beer } from '../../interface/beer';
import * as Api from '../../service/api';
import styles from './Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const [info, setInfo] = useState({} as Beer)
    useEffect(() => {
        if (!id)
            return;
        Api.getBeer(parseInt(id))
            .then(res => res.json())
            .then((res: Beer[]) => {
                setInfo(res[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={styles.container}>
            <img src={info.image_url} className={styles.beerImage} alt="Image" />
            <div className={styles.infoContainer}>
                <h1>{info.name}</h1>
                <h3>{info.tagline}</h3>
                <p>{info.description}</p>
                <h4>First brewed at {info.first_brewed}</h4>
                <h4>Food pairing: {info.food_pairing ? info.food_pairing.join(', ') : ''}</h4>
                <h3>Ingredients: </h3>
                <div className={styles.ingredientsContainer}>
                    <h4>Hops:</h4>
                    {info.ingredients &&
                        info.ingredients.hops.map((hop, index) => <h5 key={index}>{hop.name}, add at {hop.add}, {hop.amount.value}{hop.amount.unit}</h5>)}
                    <h4>Malt:</h4>
                    {info.ingredients &&
                        info.ingredients.malt.map((malt, index) => <h5 key={index}>{malt.name}, {malt.amount.value}{malt.amount.unit}</h5>)}
                    <h4>Yeast: <h5>{info.ingredients && info.ingredients.yeast}</h5></h4>
                </div>
            </div>
        </div>
    )
}

export default Detail;