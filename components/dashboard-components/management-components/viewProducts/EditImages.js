import { useEffect, useState } from "react";
import {
  CardBody,
  Form,
  Label,
  Card,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { updateProductImage } from "../../../../lib/controller/product";

const EditImages = (id, imageUrl) => {
  const [updatedImages, setUpdatedImages] = useState(id.imageUrl);
  const [loading, setLoading] = useState(false);

  const [newImage, setNewImage] = useState(null);
  console.log(id.imageUrl);

  const addImage = (event) => {
    event.preventDefault();
    setLoading(true);

    updatedImages.push(newImage);
    const newArr = updatedImages;
    setUpdatedImages(newArr);
    console.log(updatedImages);
    //updateProductImage(id, updatedImages);

    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Spinner>loading...</Spinner>
      ) : (
        updatedImages &&
        updatedImages.map((image, i) => (
          <Card key={i}>
            <img src={image} />

            <Button
              onClick={() => {
                const update = updatedImages.filter((img) => img != image);

                setUpdatedImages(update);
              }}
            >
              Remove
            </Button>
            <CardBody></CardBody>
          </Card>
        ))
      )}

      <Form>
        <Label>URL</Label>
        <Input
          type="text"
          placeholder="IPFS URL"
          onChange={(e) => setNewImage(e.target.value)}
        />
        <Button type="submit" onClick={addImage}>
          Add Image
        </Button>
      </Form>

      <div>
        <Button
          onClick={() => {
            addImage;
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditImages;
