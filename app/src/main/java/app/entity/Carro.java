package app.entity;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Carro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome;
	//private int ano;
	//private String modelo;
	
	
	//LIGAÇÃO COM MARCA NO BD. um carro só pode ter uma marca e uma marca pode ter vários carros
	@ManyToOne
	@JsonIgnoreProperties("carros")
	private Marca marca;
	
	//LIGAÇÃO COM ACESSORIOS NO BD. um carro pode ter varios acessorios e um acessorio pode ter vários carros
	@ManyToMany
	@JoinTable(name="carro_acessorio")
	private List<Acessorio> acessorios;
	
	/*//LIGAÇÃO COM PROPRIETÁRIO NO BD, um carro pode ter vários proprietários e um proprietário pode ter vários carros
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="carro_proprietario")
	private List<Proprietario> proprietarios;*/
	
}
