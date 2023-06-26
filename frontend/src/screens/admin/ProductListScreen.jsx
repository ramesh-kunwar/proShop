import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  console.log(products);

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if(window.confirm("Are you sure ?")){
      try {
        await deleteProduct(id)
        refetch()
      } catch (error) {
        toast.error(error.data.error)
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure  you want to create a new product ? ")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        console.log(error);
        toast(error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} className="btn-sm m-2">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive cname="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={Math.random()}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        onClick={() => deleteHandler(product._id)}
                        variant="danger"
                        className="btn-sm"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
