package app.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Carro;
import app.entity.Marca;
import app.repository.MarcaRepository;

@Service
public class MarcaService {
	
	@Autowired
	private MarcaRepository marcaRepository;
	
	public String save(Marca marca) {
		this.marcaRepository.save(marca);
		return marca.getNome()+ " salvo com sucesso";
	}
	
	public String update(Marca marca, long id) {
		marca.setId(id);
		this.marcaRepository.save(marca);
		return marca.getNome()+ " foi atualizado(a) com sucesso !!!";
	}
	
	public String delete(long id) {
		this.marcaRepository.deleteById(id);
		return " deletado com sucesso !!!";
	}
	
	public List<Marca> findAll(){
		List<Marca> lista = this.marcaRepository.findAll();
		return lista;
	}
	
	public Marca findById(long id) {
		Marca marca = this.marcaRepository.findById(id).get();
		return marca;
	}
	
	public List<Marca> findByNome(String nome){
		return this.marcaRepository.findByNome(nome);
	}
	
}
