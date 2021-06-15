import React from "react";
import s from "./Searchbar.module.css"

const Searchbar = ({state: {queryWord}, handleChange, onSearch}) => {

    return <header className={s.searchbar}>
            <form className={s.searchForm}>
                <button onClick={onSearch} type="submit" className={s.searchFormButton}>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                </button>

                <input onChange={handleChange}
                    className={s.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={queryWord}
                />
            </form>
        </header>

}

export default Searchbar