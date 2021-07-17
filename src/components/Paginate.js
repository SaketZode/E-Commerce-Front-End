import React from "react"
import { Button, Pagination } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

function Paginate({ pages, page, previous, next, uri = "", keyword = "", isAdmin = false }) {
	const history = useHistory()

	const previousHandler = () => {
		history.push(`${uri}/?${previous.split("?")[1]}`)
	}

	const nextHandler = () => {
		history.push(`${uri}/?${next.split("?")[1]}`)
	}
	return (
		<div style={{ margin: "auto" }}>
			<Pagination size="sm">
				<Pagination.Item disabled={previous === null} onClick={previousHandler}>
					Previous
				</Pagination.Item>
				{[...Array(pages).keys()].map((x) => (
					<Pagination.Item
						onClick={() => {
							history.push(`${uri}/?keyword=${keyword}&page=${x + 1}`)
						}}
						key={x + 1}
						active={page === x + 1}
					>
						{x + 1}
					</Pagination.Item>
				))}
				<Pagination.Item disabled={next === null} onClick={nextHandler}>
					Next
				</Pagination.Item>
			</Pagination>
		</div>
	)
	/*to={`/?keyword=${keyword}&page=${x + 1}`} style={{ padding: 10 }}*/
}

export default Paginate
