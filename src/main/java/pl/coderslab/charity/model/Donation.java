package pl.coderslab.charity.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name="donation")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private int quantity;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "donation_category",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "donation_id"))
    private Set<Category> categories = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    private String street;

    private String city;

    @Column(name = "zipcode")
    private String zipCode;

    @Column(name = "pickup_date")
    private Date pickUpDate;

    @Column(name = "pickup_time")
    private Time pickUpTime;

    @Column(name = "pickup_comment")
    private String pickUpComment;

}
