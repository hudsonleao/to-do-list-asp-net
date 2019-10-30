import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class AddUsers extends Component {
    state = {
        email: '',
        senha: '',
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch('https://localhost:44352/api/usuarios/criar', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                email: this.state.email,
                senha: this.state.senha,
            })
        })
            .then(response => response.json())
            .then(item => {
                if (item.id) {
                    this.props.addItemToState(item)
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch('https://localhost:44352/api/usuarios/criar', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                email: this.state.email,
                senha: this.state.senha,
            })
        })
            .then(response => {
                if (response.ok === true) {
                    this.props.updateState({
                            email: this.state.email,
                            senha: this.state.senha,
                    })
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Senha</Label>
                    <Input type="password" name="senha" id="senha" onChange={this.onChange} value={this.state.senha} />
                </FormGroup>
                <Button>Salvar</Button>
            </Form>
        );
    }
}
export default AddUsers
