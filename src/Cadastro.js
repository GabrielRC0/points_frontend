import React, { useState, useEffect } from "react";
import axios from "axios";

const Cadastro = () => {
  const [selectedCategory, setSelectedCategory] = useState("entity");
  const [entities, setEntities] = useState([]);
  const [sports, setSports] = useState([]);
  const [entityForm, setEntityForm] = useState({
    nome: "",
    sigla: "",
    estado: "",
  });
  const [sportForm, setSportForm] = useState({ nome: "", tipo: "" });

  useEffect(() => {
    axios
      .get("https://points-backend-0rky.onrender.com/entities")
      .then((response) => setEntities(response.data));

    axios
      .get("https://points-backend-0rky.onrender.com/sports")
      .then((response) => setSports(response.data));
  }, []);

  const handleEntityChange = (e) => {
    const { name, value } = e.target;
    setEntityForm({ ...entityForm, [name]: value });
  };

  const handleSportChange = (e) => {
    const { name, value } = e.target;
    setSportForm({ ...sportForm, [name]: value });
  };

  const handleEntitySubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://points-backend-0rky.onrender.com/entities", entityForm)
      .then((response) => {
        setEntities((prevEntities) => [...prevEntities, response.data]);
        setEntityForm({ nome: "", sigla: "", estado: "" });
      })
      .catch((error) => {
        alert("Erro ao cadastrar entidade: " + error.message);
      });
  };

  const handleSportSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://points-backend-0rky.onrender.com/sports", sportForm)
      .then((response) => {
        setSports((prevSports) => [...prevSports, response.data]);
        setSportForm({ nome: "", tipo: "" });
      })
      .catch((error) => {
        alert("Erro ao cadastrar esporte: " + error.message);
      });
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="entity">Entidade</option>
        <option value="sport">Esporte</option>
      </select>

      {selectedCategory === "entity" && (
        <form onSubmit={handleEntitySubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={entityForm.nome}
            onChange={handleEntityChange}
            required
          />
          <input
            type="text"
            name="sigla"
            placeholder="Sigla"
            value={entityForm.sigla}
            onChange={handleEntityChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={entityForm.estado}
            onChange={handleEntityChange}
            required
          />
          <button type="submit">Cadastrar Entidade</button>
        </form>
      )}

      {selectedCategory === "sport" && (
        <form onSubmit={handleSportSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={sportForm.nome}
            onChange={handleSportChange}
            required
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo"
            value={sportForm.tipo}
            onChange={handleSportChange}
            required
          />
          <button type="submit">Cadastrar Esporte</button>
        </form>
      )}

      <h2>Lista de Entidades</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => (
            <tr key={index}>
              <td>{entity.nome}</td>
              <td>{entity.sigla}</td>
              <td>{entity.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Lista de Esportes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {sports.map((sport, index) => (
            <tr key={index}>
              <td>{sport.nome}</td>
              <td>{sport.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cadastro;
