package app.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import app.entity.Acessorio;

public interface AcessorioRepository extends JpaRepository<Acessorio, Long>{
	
	//BUSCANDO ACESSORIOS PELO NOME
	public List<Acessorio> findByNome(String nome);
}
