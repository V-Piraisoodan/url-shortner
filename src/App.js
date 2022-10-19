import logo from './logo.svg';
import './App.css';
import { Route, Routes} from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function UrlMain() {
    const [input, setInput] = useState({user:[],
        Url: ""})

	useEffect(() => {
			const res = async () => {
			  let resp = await axios.get("http://localhost:9000/get");
			  setInput({...input,user:resp.data})
			  }
			res();
		  }, [input.Url]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/shortUrls", { Url: input.Url });
            console.log(res.data)
        } catch (error) {
            console.log(error)}
    }
return (
        <div className="container">
			<div className='inputbox'>
                <div className="name">URL SHORTENER</div>
                <form onSubmit={handleSubmit} className="form">
                    <input required type="url" placeholder="Paste a url here"
                        name="Url" className='input' 
						value={input.Url} 
						onChange={(e) => setInput({ ...input, Url: e.target.value })} />
                    <button type="submit" className="button">Click</button>     
                </form>
			</div>
            <div className='output'>
                <table className="table">
                    <thead className='table-ead'>
                       <tr className='table-head'>
                           <th className='thead'>URL</th>
                           <th className='thead'>Short URL</th>
                           <th className='thead' id='tth'>Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {input.user.map(ele => {
                            return(
                                <tr key="ele._id">
                                   <td>
                                      <a href={ele.full} target="_blank">{ele.full}</a>
                                    </td>
                                    <td><a href={`http://localhost:9000/${ele.short}`} target="_blank">{ele.short}</a></td>
                                    <td>{ele.clicks}</td>
                                </tr>
                            )})}
                    </tbody>
              </table>
            </div>
        </div>
)}
