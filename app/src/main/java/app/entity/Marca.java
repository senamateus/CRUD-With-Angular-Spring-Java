package app.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Marca {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome;
	/*private String cnpj;
	
	
	@OneToMany(mappedBy = "marca")
	@JsonIgnoreProperties("marca")
	private List<Carro> carros;*/
	
	
}
