import React, { useEffect, useState } from "react";
import Suggestion from "./suggestion";

const SearchAutoComplete = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData = 
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
        setFilteredUsers(filteredData);
        setShowDropdown(true);
    } else {
      setShowDropdown(false)
    }
  }

  const handleClick = (e) => {
    setShowDropdown(false)
    setSearchParam(e.target.innerText)
    setFilteredUsers([])
  }

  async function fetchData() {
    try {
      setLoading(true);

      const res = await fetch("https://dummyjson.com/users");
      const data = res.json();
      setLoading(false);

      if (data && data.users && data.users.length) {
        setUsers(data.users.map(userItem => userItem.firstName));
      }
    } catch (error) {
      setError(error.msg);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error Occured... !</div>;
  }

  return (
    <div className="search-autocomplete-container">
      {
        loading ? (
          <h1>Loading ...</h1>
         ) : (
          <input
            value={searchParams}
            name="search-users"
            placeholder="Search Users here..."
            onChange={handleChange}
      />
         )
      }
      
      {
        showDropdown && <Suggestion handleClick={handleClick} data={filteredUsers}/>
      }
    </div>
  );
};

export default SearchAutoComplete;
