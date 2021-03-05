import React, { useState } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export const ReadmissionForm = ({ onNewMovie }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);

  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="movie title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
     <Form.Field>
        <Input
          placeholder="year"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Button
          onClick={async () => {
            const movie = { title, rating };
            const response = await fetch("http://localhost:5000/add_movie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(movie)
            });

            if (response.ok) {
              console.log("response worked!");
//              onNewMovie(movie);
//              setTitle("");
//              setRating(1);
            }
          }}
        >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};
