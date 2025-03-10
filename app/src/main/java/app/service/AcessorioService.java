package app.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.entity.Acessorio;
import app.entity.Carro;
import app.repository.AcessorioRepository;

@Service
public class AcessorioService {

	@Autowired
	private AcessorioRepository acessorioRepository;
	
		public String save(Acessorio acessorio){
			this.acessorioRepository.save(acessorio);
			return acessorio.getNome()+ " salvo com sucesso";
		}
		
		public String update(Acessorio acessorio, long id) {
			acessorio.setId(id);
			this.acessorioRepository.save(acessorio);
			return acessorio.getNome()+ " salvo com sucesso !!!";
		}
		
		public String delete(long id) {
			this.acessorioRepository.deleteById(id);
			return " deletado com sucesso";
		}
		
		public List<Acessorio> findAll(){
			List<Acessorio> lista = this.acessorioRepository.findAll();
			return lista;
		}
		
		public Acessorio findById(long id) {
			Acessorio acessorio = this.acessorioRepository.findById(id).get();
			return acessorio;
		}
		
		public List<Acessorio> findByNome(String nome){
			return this.acessorioRepository.findByNome(nome);
		}
}
