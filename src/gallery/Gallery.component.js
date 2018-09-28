import React, { Component } from 'react';
import axios from 'axios';
import './Gallery.css';
import { Photo } from '../photo/Photo.component';
import LoadingGif from './assets/loading.gif';

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'https://www.googleapis.com';
let listOfPhotos = ['initial'];

export class Gallery extends Component {
    state = {
        Photoslist: '',
        Loading: false,
        index: 0
    }

    fetchData = (query, index, newSearch, nextPage) => {
        if (newSearch) {
            listOfPhotos = [];
            this.props.reset();
            this.setState({ index: 0 })
        }
        this.setState({ Loading: true })
        if (index === 0) index = 1;
        if (this.state.Photoslist[0] !== 'initial') {
            axios.get('/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=20&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=1ca94331d67f5f17586b15e6157d4d31&start=' + index + '&searchtype=image&cx=001183968013340754948:ftzc20a87fy&q=' + query + '&cse_tok=AF14hljCQkk9auHNKkzfAbg42dY0I5fs7g:1537810227009&googlehost=www.google.com')
                .then(response => {
                    if (response.data.results) {
                        response.data.results.forEach(element => {
                            if (element.url) {
                                listOfPhotos.push(element.url)
                            }
                        });
                        this.setState({ Loading: false, index: this.state.index + 21 })
                    }
                }).then(this.setState({ Photoslist: listOfPhotos }))
        }
    }

    componentDidUpdate(prevProps) {
        let props = this.props;
        let state = this.state;
        if ((props.category !== prevProps.category || props.nextPage !== prevProps.nextPage) && state.Loading === false) {
            this.fetchData(props.category, state.index, props.newSearch, props.nextPage);
        }
    }

    render() {
        const Photos = this.state.Photoslist;
        let Elements;
        if (Photos[0]) {
            Elements = Photos.map((photo) => {
                return (
                    <Photo image={photo} key={photo} />
                )
            });
        };
        return (
            <div className="Gallery">
                {Elements}
                {this.state.Loading && <div id={'Loading_container'}><img id='loading' src={LoadingGif} alt={'Loading...'} /></div>}
            </div>
        )
    }
};
