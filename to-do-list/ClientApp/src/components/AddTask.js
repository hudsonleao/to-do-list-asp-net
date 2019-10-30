import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class AddTask extends Component {
    state = {
        id: 0,
        nome: '',
        descricao: '',
        data: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch('https://localhost:44352/api/Lists', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                nome: this.state.nome,
                descricao: this.state.descricao,
                data: this.state.data
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
        fetch('https://localhost:44352/api/Lists/' + this.state.id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                nome: this.state.nome,
                descricao: this.state.descricao,
                data: this.state.data,
            })
        })
            .then(response => {
                if (response.ok === true) {
                    this.props.updateState({
                        id: this.state.id,
                        nome: this.state.nome,
                        descricao: this.state.descricao,
                        data: this.state.data,
                    })
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { id, nome, descricao, data } = this.props.item
            this.setState({ id, nome, descricao, data })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Input type="text" name="id" hidden="hidden" id="id" onChange={this.onChange} value={this.state.id === null ? '' : this.state.id} />
                </FormGroup>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" name="descricao" id="descricao" onChange={this.onChange} value={this.state.descricao === null ? '' : this.state.descricao} />
                </FormGroup>
                <FormGroup>
                    <Label for="data">Data</Label>
                    <Input type="datetime-local" name="data" id="data" onChange={this.onChange} value={this.state.data === null ? '' : this.state.data} />
                </FormGroup>
                <Button>Salvar</Button>
            </Form>
        );
    }
}
export default AddTask
