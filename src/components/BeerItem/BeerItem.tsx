import React from 'react'
import { Beer } from '../../interface/beer'
import styles from './BeerItem.module.css'

type BeerItemProps = {
    info: Beer
    onPress: () => void
}

const BeerItem = ({ info, onPress }: React.PropsWithChildren<BeerItemProps>) => {
    return (
        <div className={styles.container} onClick={onPress} >
            <img src={info.image_url} className={styles.beerImage} alt="Image"></img>
            <h2>{info.name}</h2>
            <p className={styles.description}>{info.description}</p>
        </div>
    )
}

export default BeerItem;