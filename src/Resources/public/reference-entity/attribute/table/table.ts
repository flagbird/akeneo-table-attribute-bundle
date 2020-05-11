// ############### MODEL ###############

/**
 * ## Import section
 *
 * This is where your dependencies to external modules are, using the standard import method (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
 * The paths are relative to the public/bundles folder (at the root of your PIM project)
 */
import Identifier, {createIdentifier} from 'akeneoreferenceentity/domain/model/attribute/identifier';
import ReferenceEntityIdentifier, {
    createIdentifier as createReferenceEntityIdentifier,
} from 'akeneoreferenceentity/domain/model/reference-entity/identifier';
import LabelCollection, {createLabelCollection} from 'akeneoreferenceentity/domain/model/label-collection';
import AttributeCode, {createCode} from 'akeneoreferenceentity/domain/model/attribute/code';
import {
    NormalizedAttribute,
    Attribute,
    ConcreteAttribute,
} from 'akeneoreferenceentity/domain/model/attribute/attribute';

/**
 * This interface will represent your normalized attribute (usually coming from the backend but also used in the reducer)
 */
export interface NormalizedTableAttribute extends NormalizedAttribute {
    type: 'flagbit_table';
}

/**
 * Here we define the interface for our concrete class (our model) extending the base attribute interface
 */
export interface TableAttribute extends Attribute {
    normalize(): NormalizedTableAttribute;
}

/**
 * Here we are starting to implement our custom attribute class.
 * Note that most of the code is due to the custom property (defaultValue). If you don't need to add a
 * custom property to your attribute, the code can be stripped to it's minimal
 */
export class ConcreteTableAttribute extends ConcreteAttribute implements TableAttribute {
    /**
     * Here, our constructor is private to be sure that our model will be created through a named constructor
     */
    private constructor(
        identifier: Identifier,
        referenceEntityIdentifier: ReferenceEntityIdentifier,
        code: AttributeCode,
        labelCollection: LabelCollection,
        valuePerLocale: boolean,
        valuePerChannel: boolean,
        order: number,
        is_required: boolean
    ) {
        super(
            identifier,
            referenceEntityIdentifier,
            code,
            labelCollection,
            'flagbit_table',
            valuePerLocale,
            valuePerChannel,
            order,
            is_required
        );

        /**
         * This will ensure that your model is not modified after it's creation (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
         */
        Object.freeze(this);
    }

    /**
     * Here, we denormalize our attribute
     */
    public static createFromNormalized(normalizedTableAttribute: NormalizedTableAttribute) {
        return new ConcreteTableAttribute(
            createIdentifier(normalizedTableAttribute.identifier),
            createReferenceEntityIdentifier(normalizedTableAttribute.reference_entity_identifier),
            createCode(normalizedTableAttribute.code),
            createLabelCollection(normalizedTableAttribute.labels),
            normalizedTableAttribute.value_per_locale,
            normalizedTableAttribute.value_per_channel,
            normalizedTableAttribute.order,
            normalizedTableAttribute.is_required
        );
    }

    /**
     * The only method to implement here: the normalize method. Here you need to provide a serializable object (see https://developer.mozilla.org/en-US/docs/Glossary/Serialization)
     */
    public normalize(): NormalizedTableAttribute {
        return {
            ...super.normalize(),
            type: 'flagbit_table'
        };
    }
}

/**
 * The only required part of the file: exporting a denormalize method returning a custom attribute implementing Attribute interface
 */
export const denormalize = ConcreteTableAttribute.createFromNormalized;
