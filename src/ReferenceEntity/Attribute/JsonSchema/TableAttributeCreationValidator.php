<?php

namespace Flagbit\Bundle\TableAttributeBundle\ReferenceEntity\Attribute\JsonSchema;

use Akeneo\ReferenceEntity\Infrastructure\Connector\Api\Attribute\JsonSchema\Create\AttributeValidatorInterface;
use Flagbit\Bundle\TableAttributeBundle\ReferenceEntity\Attribute\TableAttribute;
use JsonSchema\Validator;

class TableAttributeCreationValidator implements AttributeValidatorInterface
{
    public function validate(array $normalizedAttribute): array
    {
        $record = Validator::arrayToObjectRecursive($normalizedAttribute);
        $validator = new Validator();
        $validator->validate($record, $this->getJsonSchema());

        return $validator->getErrors();
    }

    public function forAttributeTypes(): array
    {
        return [TableAttribute::ATTRIBUTE_TYPE_NAME];
    }

    private function getJsonSchema(): array
    {
        return [
            'type' => 'object',
            'required' => ['code', 'type', 'value_per_locale', 'value_per_channel'],
            'properties' => [
                'code' => [
                    'type' => ['string'],
                ],
                'type' => [
                    'type' => ['string'],
                ],
                'labels' => [
                    'type' => 'object',
                    'patternProperties' => [
                        '.+' => ['type' => 'string'],
                    ],
                ],
                'value_per_locale' => [
                    'type' => [ 'boolean'],
                ],
                'value_per_channel' => [
                    'type' => [ 'boolean'],
                ],
                'is_required_for_completeness' => [
                    'type' => [ 'boolean'],
                ]
            ],
            'additionalProperties' => false,
        ];
    }
}
