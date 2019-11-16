package pl.coderslab.charity.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Table(name="institution")
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(unique = true)
    private String name;

    private String description;

}
