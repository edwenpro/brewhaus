import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import BeerItem from '../../components/BeerItem/BeerItem';
import { Beer } from '../../interface/beer';
import * as Api from '../../service/api';
import styles from './Home.module.css'
import { setLoadingStatus } from '../../action/globalAction';
import { selectLoadingStatus } from '../../selector/rootSelector';

const Home = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const dispatch = useDispatch()
    const [pageSize, _setPageSize] = useState(10);
    const [beers, setBeers] = useState([] as any[])
    const [filteredBeers, setFilteredBeers] = useState([] as Beer[])
    const [searchClue, setSearchClue] = useState('');
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const isLoading = useSelector(selectLoadingStatus);

    const getBeers = async (pi: number) => {
        dispatch(setLoadingStatus(true));
        Api.getBeersByPage(pi, pageSize)
            .then(res => res.json())
            .then((res: Beer[]) => {
                setPageIndex(pi);
                setFilteredBeers([...beers, ...res].filter(beer => beer.name.toLowerCase().includes(searchClue.toLowerCase())))
                setBeers([...beers, ...res])
                dispatch(setLoadingStatus(true));
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingStatus(true));
            })
    }
    const isSticky = (_e: Event) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        if (header)
            scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
        if (containerRef && containerRef.current && window.scrollY + window.innerHeight >= containerRef.current.clientHeight && pageIndex !== 0 && !isLoading) {
            console.log(" trigger pagination :", pageIndex, window.scrollY + window.innerHeight, containerRef.current.clientHeight)
            getBeers(pageIndex + 1)
        }
    };
    useEffect(() => {
        getBeers(pageIndex + 1)
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };

    }, [isSticky])

    const onPressItem = useCallback((id: number) => {
        navigate(`/detail/${id}`)
    }, [])

    useEffect(() => {
        setFilteredBeers(beers.filter(beer => beer.name.toLowerCase().includes(searchClue.toLowerCase())))
    }, [searchClue])

    return (
        <div className={styles.container} id="scroller" ref={containerRef}>
            <div className="header-section d-none d-xl-block">
                <input placeholder='Search' value={searchClue} onChange={evt => setSearchClue(evt.target.value)} />
            </div>
            <div>
                {filteredBeers.map((beer, index) => <BeerItem key={index} info={beer} onPress={() => onPressItem(beer.id)} />)}
            </div>
        </div>
    )
}

export default Home;