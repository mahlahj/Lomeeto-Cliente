import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Button } from "semantic-ui-react";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import BreedForm from "../BreedForm";
import PhoneForm from "../PhoneForm";
import AddressForm from "../AddressForm";
import DeleteForm from "../DeleteForm";
import AgeForm from "../AgeForm";
import OwnerForm from "../OwnerForm";

import "./SettingsForm.scss";
import ContactEmailForm from "../ContactEmailForm/ContactEmailForm";

export default function SettingsForm({
  setShowModal,
  setChildrenModal,
  setTitleModal,
  userInfo,
  refetch,
}) {
  const onChangeAge = () => {
    setTitleModal("Dinos tu edad");
    setChildrenModal(
      <AgeForm
        setShowModal={setShowModal}
        currentYears={userInfo.years}
        currentMonths={userInfo.months}
        refetch={refetch}
      />
    );
  };
  const onChangeOwner = () => {
    setTitleModal("Dinos quién es tu humano");
    setChildrenModal(
      <OwnerForm
        setShowModal={setShowModal}
        currentOwner={userInfo.owner}
        refetch={refetch}
      />
    );
  };

  const onChangeAddress = () => {
    setTitleModal("Dinos tu dirección");
    setChildrenModal(
      <AddressForm
        setShowModal={setShowModal}
        currentAddress={userInfo.address}
        refetch={refetch}
      />
    );
  };

  const onChangePhones = () => {
    setTitleModal("¿En cuáles teléfonos te pueden contactar?");
    setChildrenModal(
      <PhoneForm
        setShowModal={setShowModal}
        currentPhones={userInfo.phone}
        refetch={refetch}
      />
    );
  };

  const onChangeBreed = () => {
    setTitleModal("Actualizar tu raza");
    setChildrenModal(
      <BreedForm
        setShowModal={setShowModal}
        currentBreed={userInfo.breed}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Actualizar tu descripción");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={userInfo.description}
        refetch={refetch}
      />
    );
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar correo");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={userInfo.email}
        refetch={refetch}
      />
    );
  };

  const onChangeContactEmail = () => {
    setTitleModal("Actualizar tu correo de contacto");
    setChildrenModal(
      <ContactEmailForm
        setShowModal={setShowModal}
        currentContactEmail={userInfo.contactEmail}
        refetch={refetch}
      />
    );
  };

  const onChangePassword = () => {
    setTitleModal("Cambia tu contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onDeleteUser = () => {
    setTitleModal("¿Eliminar permanentemente tus datos?");

    setChildrenModal(
      <DeleteForm
        setShowModal={setShowModal}
        currentUser={userInfo.username}
        logout={onLogout}
      />
    );
  };

  const { logout } = useAuth();
  const history = useHistory();
  const client = useApolloClient();

  const onLogout = () => {
    client.clearStore(); //para limpiar la cache
    logout();
    history.push("/"); //redireccionar al inicio
  };

  return (
    <>
      {userInfo.business ? (
        <div className="settings-form">
          <Button onClick={onChangePassword}>Cambiar contraseña</Button>
          <Button onClick={onChangeEmail}>Cambiar correo de usuario</Button>
          <Button onClick={onChangeAddress}>Cambiar dirección</Button>
          <Button onClick={onChangePhones}>Cambiar teléfonos</Button>
          <Button onClick={onChangeContactEmail}>
            Cambiar correo de contacto
          </Button>
          {/* <Button onClick={onChangePhones}>Cambiar horario</Button> */}
          <Button onClick={onChangeDescription}>Cambiar descripción</Button>
          <Button onClick={onLogout} className="logout">
            Cerrar sesión
          </Button>
          <Button onClick={onDeleteUser} className="delete">
            Borrar usuario
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
      ) : (
        <div className="settings-form">
          <Button onClick={onChangePassword}>Cambiar contraseña</Button>
          <Button onClick={onChangeEmail}>Cambiar correo</Button>
          <Button onClick={onChangeAge}>Cambiar edad</Button>
          <Button onClick={onChangeBreed}>Cambiar raza</Button>
          <Button onClick={onChangeOwner}>Cambiar humano</Button>
          <Button onClick={onChangeDescription}>Cambiar descripción</Button>
          <Button onClick={onLogout}>Cerrar sesión</Button>
          <Button onClick={onDeleteUser} className="delete">
            Borrar usuario
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
      )}
    </>
  );
}
