package app.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.entity.Carro;
/*import app.entity.Marca;*/
import app.repository.CarroRepository;

@Service
public class CarroService {
	
	@Autowired //ISSO É INSTANCIAR UM OBJETO, AQUI NO CASO É A INTERFACE
	private CarroRepository carroRepository;
	
	public String save(Carro carro) {
		//Regra de negócio para verificar o nome e ano do carro
		//this.verificarNomeCarro(carro.getNome(), carro.getAno());
		this.carroRepository.save(carro);
		return carro.getNome()+ " salvo com sucesso";
	}
	
	public boolean verificarNomeCarro(String nome, int ano){
		if(nome.equals("Jeep Compass") && ano < 2006 ) {
			throw new RuntimeException();
		} else {
			return true;
		}
	}
	
	public String update(Carro carro, long id) {
		//Regra de negócio para verificar o nome e ano do carro
		//this.verificarNomeCarro(carro.getNome(), carro.getAno());
		
		carro.setId(id);
		this.carroRepository.save(carro);
		return carro.getNome()+ " foi atualizado com sucesso !!!";
	}
	
	public String delete(long id) {
		this.carroRepository.deleteById(id);
		return " deletado com sucesso";
	}
	
	public List<Carro> findAll(){
		List<Carro> lista = this.carroRepository.findAll();
		return lista;
	}
	
	public Carro findById(long id) {
		Carro carro = this.carroRepository.findById(id).get();
		return carro;
	}
	
	public List<Carro> findByNome(String nome){
		return this.carroRepository.findByNome(nome);
	}
	
	/*public List<Carro> findByMarca(long idMarca){
		Marca marca = new Marca();
		marca.setId(idMarca);
		return this.carroRepository.findByMarca(marca);
	}*/
	
	/*public List<Carro> findAcimaAno(int ano){
		return this.carroRepository.findAcimaAno(ano);
	}*/

	
}
