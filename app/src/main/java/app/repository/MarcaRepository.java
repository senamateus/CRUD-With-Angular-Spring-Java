package app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.entity.Carro;
//import app.entity.Carro;
import app.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long>{
	
	//BUSCANDO CARROS PELA MARCA
	public List<Marca> findByNome(String nome);
}
