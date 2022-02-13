import React, {useState} from 'react';
import {debounce} from 'lodash';
import SearchResult from './SearchResult';

const debounceTime = 1000; 

const SearchComp = () => {
    const [eventList, updateEventList] = useState([]);
    const [performerList, updatePerformerList] = useState([]);
    const [venueList, updateVenueList] = useState([]);

    const searchCall = async (e) => {
        let value = e.target.value;
        if(value === "") {
            updateEventList([]);
            updatePerformerList([]);
            updateVenueList([]);
        } else {
            try {
                let response = await fetch(`https://mobile-staging.gametime.co/v1/search?q=${value}`);
                let jsonFormat = await response.json();
                let events = jsonFormat.events;
                let performers = jsonFormat.performers;
                let venues = jsonFormat.venues;
                updateEventList(events);
                updatePerformerList(performers);
                updateVenueList(venues);
            } catch(e) {
                updateEventList([]);
                updatePerformerList([]);
                updateVenueList([]);
            }
        }
    }

    const debounceSearch = debounce(searchCall, debounceTime);

    const searchResultDisplay = (() => {
        let events = eventList.slice(0, 3).map(event => {
            return <SearchResult key={event.event.id} imgUrl={event.venue.image_url} title={event.event.name} subTitle={event.venue.name} /> 
        })
        let performers = performerList.slice(0, 3).map(performer => {
            return <SearchResult key={performer.id} imgUrl={performer.hero_image_url} title={performer.name} subTitle={performer.category} />
        })
        let venues = venueList.slice(0, 3).map(venue => {
            return <SearchResult key={venue.id} imgUrl={venue.image_url} title={venue.name} subTitle={venue.city} />
        })

        let listForDisplay = events.concat(performers, venues);
        return listForDisplay;
    })()

    return (
        <div className="search_container">
            <div>
                <input className='searchbar' onKeyUp={debounceSearch} />
                {
                    (searchResultDisplay.length > 0) && (
                        <div className='result_container'>
                        {searchResultDisplay}
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchComp;