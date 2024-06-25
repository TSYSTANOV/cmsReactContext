import { useEffect, useState } from "react";
import { DELETE_ITEM } from "../constants/api";

export const withApi = (Component, url) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(url + page).then((res) => res.json());
          setData(res);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }, [page]);
    async function deleteItem(id) {
      try {
        setLoading(true);
        const res = await fetch(DELETE_ITEM + id, {
          method: "DELETE",
        });

        setPage(page);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    return (
      <>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <Component
            {...props}
            data={data}
            setPage={setPage}
            page={page}
            deleteItem={deleteItem}
          />
        )}
      </>
    );
  };
};
