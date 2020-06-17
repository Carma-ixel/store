import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Register from "@/components/Register";


describe('Register.vue', () =>{
            //Given (sinonimo: Arrange): dado que existe..
            const wrapper = mount (Register)
            let checkbox = wrapper.find ('input[type="checkbox"]')
            let registerBtn = wrapper.find ('button[type="submit"]')
    it('has disable button', () =>{
       //When:(Act) cuando pasa cierta cosa
        checkbox.setChecked(false)
        //then(Assert): entonces, pasa cierta otra cosa 
        expect (registerBtn.classes('is-disabled')).to.be.true
    })
    it ('has a button not disabled when checkbox is cheked', () =>{
        checkbox.setChecked(true)
        expect (registerBtn.classes('is-disabled')).to.be.false
    })
    it ('register a User', () =>{
        //cargar el componente de métodos de prueba
        let isSent = false
        function stubMethod() {isSent = true}
        const wrapper = mount (Register, {
            methods:{
                submitForm: stubMethod
            }     
        })
        //encontrar los campos necesarios
        let userName = wrapper.find('input[type="text"]')
        let email = wrapper.find('input[type="email"]')
        let password = wrapper.find('input[type="password"]')
        let registerBtn = wrapper.find('button[type="submit"]')
        //Asignación de valores a los campos
        userName.setValue('Nombrecito')
        email.setValue('aa@tupamaro.com')
        password.setValue('1234')
        //enviar formulario
        registerBtn.trigger('click')
        //Probar que se enevió el registro+
        expect(isSent).to.be.true
    })
})
